import React from "react";

import Link from "next/link";

import { ArrowRight, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import ButtonAnimatedBorder from "ui/special/button-animated-border";

import productImage from "~/assets/images/product-image.png";
import AnimatedTabs from "~/components/ui/special/animated-tabs";
import BadgeAnimatedBorder from "~/components/ui/special/badge-animated-border";
import BadgeBackgroundShine from "~/components/ui/special/badge-background-shine";
import BadgeRotateBorder from "~/components/ui/special/badge-rotate-border";
import ButtonBackgroundShine from "~/components/ui/special/button-background-shine";
import ButtonRotateBorder from "~/components/ui/special/button-rotate-border";
import CardAnimatedBorder from "~/components/ui/special/card-animated-border";
import CardBackgroundShine from "~/components/ui/special/card-background-shine";
import CardProduct from "~/components/ui/special/card-product";
import CardRevealedPointer from "~/components/ui/special/card-revealed-pointer";
import DropdownMenu from "~/components/ui/special/dropdown-menu";
import TextAnimatedGradient from "~/components/ui/special/text-animated-gradient";
import TextGradient from "~/components/ui/special/text-gradient";
import TextShine from "~/components/ui/special/text-shine";
import { cn } from "~/utils/tailwindcss";

interface Props {
  className?: string;
}

const AllCrafts: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8",
        className
      )}
    >
      <Wrapper
        name="Button animated border"
        componentName="button-animated-border"
      >
        <ButtonAnimatedBorder>Button</ButtonAnimatedBorder>
      </Wrapper>
      <Wrapper name="Button rotate border" componentName="button-rotate-border">
        <ButtonRotateBorder>Button</ButtonRotateBorder>
      </Wrapper>
      <Wrapper
        name="Button background shine"
        componentName="button-background-shine"
      >
        <ButtonBackgroundShine>Button</ButtonBackgroundShine>
      </Wrapper>
      <Wrapper
        name="Badge animated border"
        componentName="badge-animated-border"
      >
        <BadgeAnimatedBorder>Badge</BadgeAnimatedBorder>
      </Wrapper>
      <Wrapper name="Badge rotate border" componentName="badge-rotate-border">
        <BadgeRotateBorder>Badge</BadgeRotateBorder>
      </Wrapper>
      <Wrapper
        name="Badge background shine"
        componentName="badge-background-shine"
      >
        <BadgeBackgroundShine>Badge</BadgeBackgroundShine>
      </Wrapper>
      <Wrapper
        name="Card background shine"
        componentName="card-background-shine"
      >
        <CardBackgroundShine title="Starter">
          Explore the new website that simplifies the creation of sophisticated
          dark mode components.
        </CardBackgroundShine>
      </Wrapper>
      <Wrapper name="Card animated border" componentName="card-animated-border">
        <CardAnimatedBorder title="Starter">
          Explore the new website that simplifies the creation of sophisticated
          dark mode components.
        </CardAnimatedBorder>
      </Wrapper>
      <Wrapper
        name="Card revealed pointer"
        componentName="card-revealed-pointer"
      >
        <CardRevealedPointer title="Starter">
          Explore the new website that simplifies the creation of sophisticated
          dark mode components.
        </CardRevealedPointer>
      </Wrapper>
      <Wrapper
        name="Card Product"
        componentName="card-product"
        className="col-span-2"
        blockClassName="h-[510px]"
      >
        <CardProduct
          name="Starter Pack"
          description="Library of dark mode components to illuminate your applications with elegance and sophistication."
          productImage={productImage}
          buttonChildren="Purchase"
          price={271}
        />
      </Wrapper>
      <Wrapper
        name="Animated tabs"
        componentName="animated-tabs"
        className="col-span-2"
        blockClassName="h-[250px]"
      >
        <AnimatedTabs />
      </Wrapper>
      <Wrapper
        name="Dropdown Menu"
        componentName="dropdown-menu"
        className="col-span-2"
        blockClassName="h-[250px]"
      >
        <DropdownMenu />
      </Wrapper>
      <Wrapper name="Text Gradient" componentName="text-gradient">
        <TextGradient>Text Gradient</TextGradient>
      </Wrapper>
      <Wrapper
        name="Text Animated Gradient"
        componentName="text-animated-gradient"
      >
        <TextAnimatedGradient>Text Animated Gradient</TextAnimatedGradient>
      </Wrapper>
      <Wrapper name="Text Shine" componentName="text-shine">
        <TextShine>Text Shine</TextShine>
      </Wrapper>
    </section>
  );
};

export default AllCrafts;

function Wrapper({
  name,
  componentName,
  children,
  className,
  blockClassName,
}: {
  name: string;
  componentName: string;
  children: React.ReactNode;
  className?: string;
  blockClassName?: string;
}) {
  return (
    <div className={cn("", className)}>
      <Link
        href={`https://github.com/ahm0xc/starter/tree/main/src/components/ui/special/${componentName}.tsx`}
        target="_blank"
        className="mb-2 ml-1 font-medium text-sm flex gap-1 items-center hover:gap-1.5 duration-200 text-foreground/80 hover:text-foreground"
      >
        {name} <ArrowRight size={14} />
      </Link>
      <div
        className={cn(
          "w-full h-56 rounded-xl border bg-background grid place-content-center dark",
          blockClassName
        )}
      >
        <React.Suspense
          fallback={<CircleNotch className="h-5 w-5 animate-spin" />}
        >
          {children}
        </React.Suspense>
      </div>
    </div>
  );
}
