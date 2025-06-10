import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const links = [
  'Dashboard',
  'Timesheets',
  'Job Cards',
  'Calendar',
  'Settings',
  'Help',
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:flex">
      <button className="p-2 md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
        <Bars3Icon className="h-6 w-6" />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 transform bg-white shadow md:relative md:translate-x-0 w-64 p-4 space-y-2 ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform`}
        aria-label="Main navigation"
      >
        <button className="md:hidden mb-4" onClick={() => setOpen(false)}>Close</button>
        {links.map(l => (
          <a key={l} href="#" className="block p-2 rounded hover:bg-gray-100">
            {l}
          </a>
        ))}
      </nav>
      <div className="flex-1 md:ml-64 p-4">
        {/* Placeholder for page content via children */}
      </div>
    </div>
  );
}
