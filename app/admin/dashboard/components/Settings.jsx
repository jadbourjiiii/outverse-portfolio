"use client";

import { useState } from "react";

export default function Settings() {
  const [siteName, setSiteName] = useState("OUTVERSE");
  const [email, setEmail] = useState("admin@outverse.com");
  const [notifications, setNotifications] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <section className="min-h-full bg-[#050507] text-[#f5f5f7]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#e8251c] to-[#d6336c]" />

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="mt-1 text-sm text-[#9a9aa5]">
              Manage your Outverse admin preferences
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* General Settings */}
        <div className="rounded-2xl border border-[#1e1e26] bg-[#0d0d12] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              General Settings
            </h2>

            <p className="mt-1 text-sm text-[#9a9aa5]">
              Basic information about your website.
            </p>
          </div>

          <div className="space-y-5">

            {/* Site Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Website Name
              </label>

              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d6336c] focus:ring-1 focus:ring-[#d6336c]/30"
                placeholder="Website name"
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d6336c] focus:ring-1 focus:ring-[#d6336c]/30"
                placeholder="admin@example.com"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-[#1e1e26] bg-[#0d0d12] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-[#9a9aa5]">
              Control how your admin panel behaves.
            </p>
          </div>

          <div className="space-y-4">

            {/* Notifications */}
            <div className="flex items-center justify-between rounded-xl border border-[#1e1e26] bg-[#050507] p-4">
              <div>
                <p className="text-sm font-medium">
                  Notifications
                </p>

                <p className="mt-1 text-xs text-[#9a9aa5]">
                  Receive admin notifications
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`relative h-6 w-11 rounded-full transition ${
                  notifications
                    ? "bg-gradient-to-r from-[#e8251c] to-[#d6336c]"
                    : "bg-[#1e1e26]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Maintenance */}
            <div className="flex items-center justify-between rounded-xl border border-[#1e1e26] bg-[#050507] p-4">
              <div>
                <p className="text-sm font-medium">
                  Maintenance Mode
                </p>

                <p className="mt-1 text-xs text-[#9a9aa5]">
                  Temporarily disable the public website
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMaintenance(!maintenance)}
                className={`relative h-6 w-11 rounded-full transition ${
                  maintenance
                    ? "bg-gradient-to-r from-[#e8251c] to-[#d6336c]"
                    : "bg-[#1e1e26]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    maintenance ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Admin Information */}
        <div className="rounded-2xl border border-[#1e1e26] bg-[#0d0d12] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Admin Account
            </h2>

            <p className="mt-1 text-sm text-[#9a9aa5]">
              Information about the current administrator.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#1e1e26] bg-[#050507] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8251c] to-[#d6336c] text-lg font-bold">
              A
            </div>

            <div>
              <p className="font-semibold">
                Administrator
              </p>

              <p className="text-sm text-[#9a9aa5]">
                Full access
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-2xl border border-[#1e1e26] bg-[#0d0d12] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              System Status
            </h2>

            <p className="mt-1 text-sm text-[#9a9aa5]">
              Current status of your admin system.
            </p>
          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3">
              <span className="text-sm text-[#9a9aa5]">
                Website
              </span>

              <span className="flex items-center gap-2 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Online
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3">
              <span className="text-sm text-[#9a9aa5]">
                Database
              </span>

              <span className="flex items-center gap-2 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3">
              <span className="text-sm text-[#9a9aa5]">
                Admin Panel
              </span>

              <span className="flex items-center gap-2 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Active
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Save Section */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#1e1e26] bg-[#0d0d12] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">
            Save your changes
          </p>

          <p className="mt-1 text-sm text-[#9a9aa5]">
            Apply your latest admin settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-400">
              ✓ Changes saved
            </span>
          )}

          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-[#e8251c] to-[#d6336c] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d6336c]/20 transition hover:scale-[1.02] hover:shadow-[#d6336c]/30 active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}