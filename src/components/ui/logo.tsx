"use client";

import * as React from "react";
import Image from "next/image";
import { ASSETS } from "@/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  onClick?: () => void;
}

export function Logo({
  className,
  width = 40,
  height = 40,
  showText = false,
  onClick,
}: LogoProps) {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (showText) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {hasError ? (
          <div
            className="flex items-center justify-center rounded-xl bg-primary-700 text-white font-bold"
            style={{ width, height }}
          >
            FH
          </div>
        ) : (
          <Image
            src={ASSETS.logo}
alt="Future Homes Properties"
            width={width}
            height={height}
            onError={handleError}
            className="rounded-xl object-contain"
            priority
          />
        )}
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold leading-tight text-current">
Future Homes
          </span>
          <span className="text-[10px] uppercase tracking-widest text-current opacity-70">
            Properties
          </span>
        </div>
      </div>
    );
  }

  return hasError ? (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-primary-700 text-white font-bold",
        className
      )}
      style={{ width, height }}
      onClick={onClick}
    >
      FH
    </div>
  ) : (
    <Image
      src={ASSETS.logo}
      alt="Future Homes Properties"
      width={width}
      height={height}
      onError={handleError}
      className={cn("rounded-xl object-contain", className)}
      priority
      onClick={onClick}
    />
  );
}

export default Logo;