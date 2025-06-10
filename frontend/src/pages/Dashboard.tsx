import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Changelog { completed: string[]; upcoming: string[]; }

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [changelog, setChangelog] = useState<Changelog | null>(null);

  useEffect(() => {
    fetch('/changelog.json').then(r => r.json()).then(setChangelog);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    toast.success('Uploaded ' + file?.name);
    setFile(null);
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-lg font-semibold mb-2">Actions</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>Create Timesheet</Button>
          <Button>New Job Card</Button>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold mb-2">Upload Timesheet</h2>
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center"
        >
          {file ? file.name : 'Drag & drop file here'}
        </div>
        <Button onClick={handleUpload} disabled={!file} className="mt-2">Upload</Button>
      </Card>
      {changelog && (
        <Card>
          <h2 className="text-lg font-semibold mb-2">Changelog</h2>
          <h3 className="font-medium">Completed</h3>
          <ul className="list-disc list-inside">
            {changelog.completed.map(item => <li key={item}>{item}</li>)}
          </ul>
          <h3 className="font-medium mt-2">Upcoming</h3>
          <ul className="list-disc list-inside">
            {changelog.upcoming.map(item => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
