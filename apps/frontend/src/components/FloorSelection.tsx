interface FloorSelectionProps {
    onFloorClick: (clickedFloor: string, clickedForURL: string) => void;
}

export default function FloorSelection({ onFloorClick }: FloorSelectionProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="171" height="270" viewBox="0 0 171 270" fill="none">

            <path
                d="M78.2188 136.141C81.4729 133.502 86.0289 133.46 89.3275 136.039L162.328 193.127C167.315 197.026 167.142 204.857 161.989 208.515L88.982 260.346C85.829 262.585 81.6668 262.548 78.5514 260.253L8.17853 208.427C3.19539 204.757 3.02552 197.139 7.83975 193.233L78.2188 136.141Z"
                fill="#7E22CE"
                onClick={() => onFloorClick("L2", "/00_thelowerlevel2.png")}
            className="cursor-pointer"/>

                <path
                    d="M78.5643 103.495C81.8184 100.855 86.3745 100.814 89.673 103.393L162.674 160.48C167.66 164.38 167.488 172.211 162.334 175.869L89.3275 227.7C86.1745 229.939 82.0124 229.902 78.8969 227.607L8.52408 175.781C3.54094 172.111 3.37107 164.493 8.1853 160.587L78.5643 103.495Z"
                    fill="#9333EA"
                    onClick={() => onFloorClick("L1", "/00_thelowerlevel1.png")}
                className="cursor-pointer"/>
                <path
                    d="M77.8861 69.1215C81.1402 66.4818 85.6963 66.4399 88.9949 69.0194L161.995 126.107C166.982 130.006 166.809 137.837 161.656 141.495L88.6493 193.327C85.4963 195.565 81.3342 195.528 78.2187 193.233L7.84588 141.407C2.86274 137.737 2.69287 130.119 7.5071 126.214L77.8861 69.1215Z"
                    fill="#A855F7"
                    onClick={() => onFloorClick("1", "/01_thefirstfloor.png")}
                    className="cursor-pointer"/>
                <path
                    d="M78.9099 36.3823C82.164 33.7426 86.72 33.7007 90.0186 36.2802L163.019 93.3675C168.006 97.2672 167.833 105.098 162.68 108.756L89.673 160.587C86.5201 162.826 82.3579 162.789 79.2424 160.494L8.86963 108.668C3.88649 104.998 3.71662 97.3797 8.53085 93.4743L78.9099 36.3823Z"
                    fill="#C084FC"
                    onClick={() => onFloorClick("2", "/02_thesecondfloor.png")}
                    className="cursor-pointer"/>
                <path
                    d="M79.2554 2.00865C82.5095 -0.631108 87.0656 -0.672973 90.3642 1.90657L163.365 58.9939C168.351 62.8935 168.179 70.7239 163.025 74.3825L90.0186 126.214C86.8656 128.452 82.7034 128.415 79.588 126.12L9.21518 74.2941C4.23204 70.6242 4.06217 63.006 8.8764 59.1006L79.2554 2.00865Z"
                    fill="#D8B4FE"
                    onClick={() => onFloorClick("3", "/03_thethirdfloor.png")}
                    className="cursor-pointer"/>

            <defs>
                <filter id="filter0_d_140_340" x="0" y="0" width="171" height="270" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_140_340"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_140_340" result="shape"/>
                </filter>
            </defs>
        </svg>
    );
}
