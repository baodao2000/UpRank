import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="16" height="16" {...props}>
      <path d="M13 4h-1.38c.19-.33.33-.67.36-.91.06-.67-.11-1.22-.52-1.61C11.1 1.1 10.65 1 10.1 1h-.11c-.53.02-1.11.25-1.53.58-.42.33-.73.72-.97 1.2-.23-.48-.55-.88-.97-1.2-.42-.32-1-.58-1.53-.58h-.03c-.56 0-1.06.09-1.44.48-.41.39-.58.94-.52 1.61.03.23.17.58.36.91H1.98c-.55 0-1 .45-1 1v3h1v5c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V8h1V5c0-.55-.45-1-1-1H13zm-4.78-.88c.17-.36.42-.67.75-.92.3-.23.72-.39 1.05-.41h.09c.45 0 .66.11.8.25s.33.39.3.95c-.05.19-.25.61-.5 1h-2.9l.41-.88v.01zM4.09 2.04c.13-.13.31-.25.91-.25.31 0 .72.17 1.03.41.33.25.58.55.75.92L7.2 4H4.3c-.25-.39-.45-.81-.5-1-.03-.56.16-.81.3-.95l-.01-.01zM7 12.99H3V8h4v5-.01zm0-6H2V5h5v2-.01zm5 6H8V8h4v5-.01zm1-6H8V5h5v2-.01z"></path>
      {/* <path fill="#E2E1E5" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 Z M8,10 C8.41421356,10 8.75,10.3357864 8.75,10.75 C8.75,11.1642136 8.41421356,11.5 8,11.5 C7.58578644,11.5 7.25,11.1642136 7.25,10.75 C7.25,10.3357864 7.58578644,10 8,10 Z M8,4.5 C8.24545989,4.5 8.44960837,4.67687516 8.49194433,4.91012437 L8.5,5 L8.5,8.5 C8.5,8.77614237 8.27614237,9 8,9 C7.75454011,9 7.55039163,8.82312484 7.50805567,8.58987563 L7.5,8.5 L7.5,5 C7.5,4.72385763 7.72385763,4.5 8,4.5 Z"></path> */}
    </Svg>
  );
};

export default Icon;
