import Image from "next/image";


export default function UserAvatar({user}: {user: any}) {
    
  
    if (!user) return null;
  
    return (
      <div>
        <Image
          src={user?.image ?? "A"}
          alt={user?.name ?? "User Avatar"}
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
      </div>
    );
  }