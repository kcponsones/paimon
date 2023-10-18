/// <reference types="next" />
/// <reference types="next/types/global" />
import NextAuth from "next-auth";

declare module 'bcryptjs';
declare module 'howler';
declare module "next-auth" {
  interface Session extends NextAuth.DefaultSession {
    expires: ISODateString;
    user?: {
        id: any;
        name?: string | null;
        email?: string | null;
        avatar?: string | null;
        role?: string | null;
    };
  }
}
interface MyStringConstructor extends StringConstructor {
  includes(searchString: string): boolean;
}

declare module '*.png' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.gif' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.webp' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.ico' {
    const content: StaticImageData;
    export default content;
  }
  
  declare module '*.bmp' {
    const content: StaticImageData;
    export default content;
  }


  declare module '*.mp4' {
    const src: string;
    export default src;
  }

  declare module '*.webm' {
    const src: string;
    export default src;
  }