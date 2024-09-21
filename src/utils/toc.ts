/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Fix this when we turn strict mode on.
import { type Nodes } from "mdast";
import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node: any) {
  const p: any[] = [];
  visit(node, (node) => {
    if (!textTypes.includes(node.type as string)) return;
    p.push(node.value);
  });
  return p.join(``);
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

function getItems(node: any, current: any): Items {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url as string;
        current.title = flattenNode(node);
      }

      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current as Items;
  }

  if (node.type === "list") {
    current.items = node.children.map((i: any) => getItems(i, {})) as any;

    return current as Items;
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {});

    if (node.children.length > 1) {
      getItems(node.children[1], heading);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node: any, file: any) => {
  const table = toc(node as Nodes);
  file.data = getItems(table.map, {});
};

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data as Items;
}
