"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const InversionButtonClientOnly = dynamic(
  () => import('@/components/custom/inversion-button'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-[calc(theme(spacing.6)_+_4.5rem)] right-6 z-50 sm:bottom-[calc(theme(spacing.6)_+_4rem)] opacity-0">
        <div className="relative rounded-full shadow-xl p-4 h-16 w-16 sm:h-auto sm:w-auto sm:px-6 sm:py-3 bg-primary" />
      </div>
    )
  }
);

export default function InvestmentFabWrapper() {
  const handleOpenModal = () => {
    window.location.href = "/plus/login";
  };

  return <InversionButtonClientOnly onOpenModal={handleOpenModal} />;
}
