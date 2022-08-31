import { LegacyRef, useEffect, useRef } from "react";

function QRCodeOutput({ url, saveImgSrc }: QRCodeOutputPropsType) {
  let divEl = useRef<HTMLDivElement>();
  useEffect(() => {
    //@ts-ignore
    let qrCode = null;
    let timeout: number;
    if (!!url && url.trim() != "" && !!divEl.current) {
      if (!qrCode) {
        //@ts-ignore
        qrCode = new QRCode(divEl.current, {
          width: 192,
          height: 192,
        });
      }
      qrCode.makeCode(url);
      timeout = setTimeout(() => {
        let img = divEl.current?.querySelector("img");
        if (!!img) saveImgSrc(img.src);
      }, 300);
    }
    return () => {
      //@ts-ignore
      if (!!qrCode) {
        //@ts-ignore
        qrCode.clear();
      }
      if (!!divEl.current) divEl.current.innerHTML = "";
      if (!!timeout) clearTimeout(timeout);
    };
  }, [url]);
  return (
    <div
      className="h-48 w-48 mx-auto transition-all duration-300"
      ref={divEl as LegacyRef<HTMLDivElement>}
    ></div>
  );
}
type QRCodeOutputPropsType = {
  url: string;
  saveImgSrc: (val: string) => void;
};
export default QRCodeOutput;
