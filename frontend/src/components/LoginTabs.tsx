import { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { Listbox } from '@headlessui/react';

const orgs = ['Acme Corp', 'Globex', 'Soylent'];

export default function LoginTabs() {
  const [tab, setTab] = useState<'org' | 'emp' | 'guest'>('org');
  const [selectedOrg, setSelectedOrg] = useState(orgs[0]);

  return (
    <div className="w-full max-w-md mx-auto">\
      <div className="flex mb-4 border-b">
        <button className={`flex-1 p-2 ${tab==='org'?'border-b-2 border-primary':''}`} onClick={()=>setTab('org')}>Organisation</button>
        <button className={`flex-1 p-2 ${tab==='emp'?'border-b-2 border-primary':''}`} onClick={()=>setTab('emp')}>Employee</button>
        <button className={`flex-1 p-2 ${tab==='guest'?'border-b-2 border-primary':''}`} onClick={()=>setTab('guest')}>Guest</button>
      </div>
      {tab==='org' && (
        <form className="space-y-4" aria-label="Organisation login form">
          <Listbox value={selectedOrg} onChange={setSelectedOrg}>
            <div className="relative">
              <Listbox.Button className="w-full rounded-md border-gray-300 shadow-sm py-2 pl-3 pr-10 text-left focus:border-primary focus:ring-primary">
                {selectedOrg}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow">
                {orgs.map(org => (
                  <Listbox.Option key={org} value={org} className={({active})=>`cursor-pointer select-none p-2 ${active?'bg-primary text-white':''}`}>{org}</Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      )}
      {tab==='emp' && (
        <form className="space-y-4" aria-label="Employee login form">
          <Input placeholder="Email" type="email" aria-label="Email" />
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      )}
      {tab==='guest' && (
        <form className="space-y-4" aria-label="Guest login form">
          <Input placeholder="Name" aria-label="Name" />
          <Button type="submit" className="w-full">Enter</Button>
        </form>
      )}
      <div className="text-center mt-4 space-x-4">
        <a href="#" className="text-sm text-primary">Forgot Password?</a>
        <a href="#" className="text-sm text-primary">Request Access</a>
      </div>
    </div>
  );
}
