declare module 'fontfaceobserver' {
  interface FontFaceObserverOptions {
    weight?: string | number;
    style?: string;
    stretch?: string;
  }

  class FontFaceObserver {
    constructor(family: string, options?: FontFaceObserverOptions);
    load(text?: string | null, timeout?: number): Promise<unknown>;
  }

  export = FontFaceObserver;
}
