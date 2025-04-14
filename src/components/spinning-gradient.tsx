export function SpinningGradient() {
    return (
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow z-10">
        <svg width="800" height="800" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[800px] h-[800px] opacity-20">
          <path fillRule="evenodd" clipRule="evenodd" d="M128.603 16.3347C115.825 -5.44489 84.3365 -5.4449 71.5579 16.3347L71.0938 17.1257C65.1986 27.1733 54.4518 33.378 42.8027 33.4596L41.8856 33.466C16.6346 33.6428 0.890585 60.9123 13.3629 82.8687L13.8159 83.6661C19.5698 93.7953 19.5698 106.205 13.8159 116.334L13.3629 117.131C0.890586 139.088 16.6346 166.357 41.8856 166.534L42.8027 166.54C54.4517 166.622 65.1986 172.827 71.0938 182.874L71.5579 183.665C84.3365 205.445 115.825 205.445 128.603 183.665L129.067 182.874C134.963 172.827 145.709 166.622 157.358 166.54L158.276 166.534C183.527 166.357 199.271 139.088 186.798 117.131L186.345 116.334C180.591 106.205 180.591 93.7953 186.345 83.6661L186.798 82.8687C199.271 60.9123 183.527 33.6428 158.276 33.466L157.358 33.4596C145.709 33.378 134.963 27.1733 129.067 17.1257L128.603 16.3347ZM100.081 149.604C127.476 149.604 149.685 127.396 149.685 100C149.685 72.6042 127.476 50.3955 100.081 50.3955C72.6848 50.3955 50.4761 72.6042 50.4761 100C50.4761 127.396 72.6848 149.604 100.081 149.604Z" fill="url(#paint0_linear_104_76)"/>
          <defs>
            <linearGradient id="paint0_linear_104_76" x1="100.081" y1="0" x2="100.081" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DF99F7"/>
              <stop offset="1" stopColor="#FFDBB0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }