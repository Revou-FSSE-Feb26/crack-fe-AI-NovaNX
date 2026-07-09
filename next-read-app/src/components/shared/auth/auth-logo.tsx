import Image from "next/image";

import nexReadLogo from "@/assets/logos/nexread-logo.png";

export function AuthLogo() {
  return (
    <div className="flex items-center">
      <Image
        src={nexReadLogo}
        alt="NexRead"
        width={180}
        height={68}
        priority
        className="h-[67.8px] w-[180px] rounded-[24.8px] object-cover shadow-[0px_10px_15px_-3px_rgba(0,_184,_219,_0.2),_0px_4px_6px_-4px_rgba(0,_184,_219,_0.2)]"
      />
    </div>
  );
}
