'use client';

import { X, Check, Crown, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg rounded-2xl border bg-white p-6 sm:p-8 shadow-2xl dark:bg-gray-900">
        {/* Header with Back and Close Buttons */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-12 sm:size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-400">
            <Crown className="size-6 sm:size-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Unlock Premium Storage
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Get more space and advanced features
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-4">
          {/* Free Plan */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">Free Plan</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">20 GB Storage</p>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-foreground">$0</p>
                <p className="text-xs text-muted-foreground">forever</p>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-xl border-2 border-purple-500 bg-purple-50 p-3 sm:p-4 dark:bg-purple-900/20">
            <div className="absolute -top-3 left-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-white">
              Popular
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">Pro Plan</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">100 GB Storage</p>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">$9.99</p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">Enterprise</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Unlimited Storage</p>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-foreground">$29.99</p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Check className="size-4 text-green-600" />
            <span>Unlimited uploads</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Check className="size-4 text-green-600" />
            <span>Advanced security</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Check className="size-4 text-green-600" />
            <span>Priority support</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Check className="size-4 text-green-600" />
            <span>Custom branding</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600 transition-all">
          Upgrade to Pro
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-[10px] sm:text-xs text-muted-foreground">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
}
