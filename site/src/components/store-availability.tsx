"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDownToLine, Clock3, X } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StoreAvailabilityProps {
  mobileLabel: string;
  comingSoon: string;
  appStoreLabel: string;
  googlePlayLabel: string;
  iosTitle: string;
  iosDescription: string;
  androidTitle: string;
  androidDescription: string;
  reviewStatus: string;
  androidDownload: string;
  closeLabel: string;
  releaseUrl: string;
  appIconUrl: string;
}

type Store = "ios" | "android";

export function StoreAvailability({
  mobileLabel,
  comingSoon,
  appStoreLabel,
  googlePlayLabel,
  iosTitle,
  iosDescription,
  androidTitle,
  androidDescription,
  reviewStatus,
  androidDownload,
  closeLabel,
  releaseUrl,
  appIconUrl,
}: StoreAvailabilityProps) {
  const [store, setStore] = React.useState<Store | null>(null);
  const isAndroid = store === "android";

  return (
    <div>
      <p className="font-mono text-[10px] uppercase text-zinc-500">{mobileLabel}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="flex h-14 items-center gap-3 rounded-lg bg-zinc-950 px-4 text-left text-zinc-100 ring-1 ring-[var(--line-strong)] transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setStore("ios")}
        >
          <img className="size-7 shrink-0 rounded-md" src={appIconUrl} alt="" width="28" height="28" />
          <span className="min-w-0">
            <span className="block font-mono text-[9px] uppercase text-zinc-500">{comingSoon}</span>
            <span className="block truncate text-sm font-medium">{appStoreLabel}</span>
          </span>
        </button>
        <button
          type="button"
          className="flex h-14 items-center gap-3 rounded-lg bg-zinc-950 px-4 text-left text-zinc-100 ring-1 ring-[var(--line-strong)] transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setStore("android")}
        >
          <img className="size-7 shrink-0 rounded-md" src={appIconUrl} alt="" width="28" height="28" />
          <span className="min-w-0">
            <span className="block font-mono text-[9px] uppercase text-zinc-500">{comingSoon}</span>
            <span className="block truncate text-sm font-medium">{googlePlayLabel}</span>
          </span>
        </button>
      </div>

      <Dialog.Root open={store !== null} onOpenChange={(open) => !open && setStore(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm motion-reduce:animate-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-950 p-6 text-zinc-100 shadow-2xl ring-1 ring-[var(--line-strong)] focus:outline-none sm:p-7">
            <Dialog.Close className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-[var(--chip)] hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={closeLabel}>
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
            <img className="size-11 rounded-lg ring-1 ring-[var(--line-strong)]" src={appIconUrl} alt="" width="44" height="44" />
            <Dialog.Title className="mt-5 pr-8 text-xl font-medium">
              {isAndroid ? androidTitle : iosTitle}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-6 text-zinc-400">
              {isAndroid ? androidDescription : iosDescription}
            </Dialog.Description>
            <div className="mt-5 flex items-center gap-2 border-y border-[var(--line)] py-3 font-mono text-[11px] text-amber-300">
              <Clock3 className="size-4" aria-hidden="true" />{reviewStatus}
            </div>
            {isAndroid && (
              <a className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-5 h-11 w-full gap-2 px-5 font-normal")} href={releaseUrl}>
                <ArrowDownToLine className="size-4" aria-hidden="true" />{androidDownload}
              </a>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
