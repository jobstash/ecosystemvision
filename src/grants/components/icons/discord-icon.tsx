import { memo } from 'react';

export const DiscordIcon = memo(() => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6.25C0 2.79822 2.79822 0 6.25 0H13.75C17.2018 0 20 2.79822 20 6.25V13.75C20 17.2018 17.2018 20 13.75 20H6.25C2.79822 20 0 17.2018 0 13.75V6.25Z"
        fill="#5865F2"
      />
      <mask
        id="mask0_4335_133186"
        maskUnits="userSpaceOnUse"
        x="2"
        y="3"
        width="16"
        height="14"
      >
        <path
          d="M2.1875 3.98438H17.8125V16.0883H2.1875V3.98438Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_4335_133186)">
        <path
          d="M15.4146 5.06247C14.4016 4.59752 13.3326 4.26593 12.2342 4.07598C12.2243 4.07416 12.214 4.07552 12.2048 4.07986C12.1956 4.08421 12.1881 4.09132 12.1832 4.1002C12.0458 4.34442 11.8936 4.66317 11.7871 4.91364C10.5861 4.7338 9.39136 4.7338 8.21503 4.91364C8.10847 4.65755 7.95081 4.34442 7.81284 4.1002C7.80776 4.09147 7.80015 4.08448 7.79101 4.08015C7.78188 4.07583 7.77165 4.07438 7.76167 4.07598C6.66325 4.2655 5.59414 4.59711 4.58128 5.06247C4.57266 5.06622 4.56536 5.07248 4.56034 5.08044C2.53472 8.10669 1.97987 11.0586 2.25206 13.9739C2.25372 13.9883 2.26103 14.0014 2.27237 14.0104C3.60878 14.9919 4.90339 15.5878 6.17394 15.9827C6.18382 15.9856 6.19436 15.9855 6.20416 15.9823C6.21396 15.9791 6.22254 15.9729 6.22878 15.9647C6.52933 15.5543 6.79722 15.1215 7.02698 14.6665C7.03015 14.6602 7.03195 14.6534 7.03228 14.6464C7.03261 14.6394 7.03146 14.6324 7.0289 14.6259C7.02634 14.6194 7.02243 14.6136 7.01742 14.6087C7.01242 14.6038 7.00644 14.6 6.99987 14.5976C6.57487 14.4364 6.17026 14.2399 5.78105 14.0167C5.77396 14.0125 5.768 14.0067 5.76371 13.9996C5.75942 13.9926 5.75692 13.9846 5.75643 13.9764C5.75595 13.9682 5.75749 13.96 5.76092 13.9525C5.76436 13.9451 5.76958 13.9385 5.77612 13.9336C5.85824 13.8722 5.93894 13.8089 6.01816 13.7439C6.0251 13.7382 6.0335 13.7345 6.04241 13.7333C6.05133 13.7321 6.0604 13.7333 6.06862 13.737C8.62581 14.9045 11.3942 14.9045 13.9211 13.737C13.9294 13.7331 13.9386 13.7316 13.9476 13.7328C13.9567 13.7339 13.9652 13.7375 13.9723 13.7432C14.0516 13.8087 14.1325 13.8721 14.215 13.9336C14.2215 13.9385 14.2268 13.945 14.2303 13.9524C14.2338 13.9599 14.2354 13.9681 14.2349 13.9763C14.2345 13.9845 14.2321 13.9925 14.2278 13.9995C14.2236 14.0066 14.2177 14.0125 14.2107 14.0167C13.8212 14.2441 13.4133 14.4382 12.9912 14.597C12.9847 14.5995 12.9787 14.6034 12.9738 14.6084C12.9688 14.6133 12.965 14.6193 12.9625 14.6258C12.96 14.6324 12.9589 14.6394 12.9593 14.6464C12.9597 14.6534 12.9615 14.6602 12.9647 14.6665C13.1984 15.1179 13.465 15.5517 13.7622 15.9641C13.7683 15.9725 13.7768 15.9788 13.7867 15.9822C13.7965 15.9855 13.8071 15.9857 13.8171 15.9827C15.0938 15.5878 16.3884 14.9919 17.7249 14.0104C17.7306 14.0062 17.7353 14.0008 17.7388 13.9946C17.7423 13.9884 17.7445 13.9816 17.7452 13.9745C18.071 10.6041 17.1995 7.67637 15.435 5.08106C15.4307 5.0726 15.4234 5.06599 15.4146 5.06247ZM7.40886 12.1988C6.63894 12.1988 6.00456 11.492 6.00456 10.624C6.00456 9.75591 6.62667 9.04911 7.40886 9.04911C8.19714 9.04911 8.82534 9.76216 8.813 10.624C8.813 11.492 8.19097 12.1988 7.40886 12.1988ZM12.6007 12.1988C11.8308 12.1988 11.1965 11.492 11.1965 10.624C11.1965 9.75591 11.8185 9.04911 12.6007 9.04911C13.389 9.04911 14.0172 9.76216 14.005 10.624C14.005 11.492 13.389 12.1988 12.6007 12.1988Z"
          fill="white"
        />
      </g>
    </svg>
  );
});

DiscordIcon.displayName = 'DiscordIcon';