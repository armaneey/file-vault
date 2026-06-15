import { HardDrive } from 'lucide-react';

export default function Icon() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
        borderRadius: '20px',
      }}
    >
      <HardDrive size={50} color="white" strokeWidth={2} />
    </div>
  );
}
