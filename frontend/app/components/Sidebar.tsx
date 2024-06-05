import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import { useRouter } from 'next/router';
import SignOutModal from './signOutModal';
import { Flex } from '@chakra-ui/react';

export default function Sidebar({ isLoading }: { isLoading: boolean }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const handleClickOutside = (event: MouseEvent) => {
        const sidebarElement = document.getElementById('default-sidebar');
        const buttonElement = document.querySelector('[data-drawer-toggle="default-sidebar"]');

        if (sidebarElement && !sidebarElement.contains(event.target as Node) &&
            buttonElement && !buttonElement.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const handleSignOut = async () => {
        setModalVisible(true);
    };

    const confirmSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    const handleLinkClick = (url: string) => {
        if (!isLoading) {
            router.push(url);
        }
    };

    return (
        <div className='sidebarContainer'>
            <SignOutModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={confirmSignOut}
                title='Are you sure you want to sign out?'
            />
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="mobileButton inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
                aria-label="Sidenav"
            >

                <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">

                    <div className="flex items-center justify-center mb-4">
                        <div>
                            <img src='https://res.cloudinary.com/dqyxqfvnv/image/upload/v1717566910/ecell_npci.png' alt="E-Cell NPCI Logo"></img>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <ul className="space-y-2">
                        <li>
                            <Link href="/dashboard/portal" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-8 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 495.398 495.398">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <g>
                                                <g>
                                                    <path
                                                        d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z">
                                                    </path>
                                                    <path
                                                        d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className="ml-3">Portal</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/dashboard/myteam" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-8 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    viewBox="0 0 20 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.07 6.41005C11.6774 5.56132 12.0041 4.54377 12.0041 3.50005C12.0041 2.45634 11.6774 1.43879 11.07 0.590053C11.6385 0.202008 12.3117 -0.00378014 13 5.2579e-05C13.9283 5.2579e-05 14.8185 0.368802 15.4749 1.02518C16.1313 1.68156 16.5 2.57179 16.5 3.50005C16.5 4.42831 16.1313 5.31855 15.4749 5.97493C14.8185 6.6313 13.9283 7.00005 13 7.00005C12.3117 7.00388 11.6385 6.7981 11.07 6.41005ZM3.5 3.50005C3.5 2.80782 3.70527 2.13113 4.08986 1.55556C4.47444 0.979985 5.02107 0.531381 5.66061 0.266474C6.30015 0.00156766 7.00388 -0.067744 7.68282 0.0673043C8.36175 0.202353 8.98539 0.535695 9.47487 1.02518C9.96436 1.51466 10.2977 2.1383 10.4327 2.81724C10.5678 3.49617 10.4985 4.1999 10.2336 4.83944C9.96867 5.47899 9.52007 6.02561 8.9445 6.4102C8.36892 6.79478 7.69223 7.00005 7 7.00005C6.07174 7.00005 5.1815 6.6313 4.52513 5.97493C3.86875 5.31855 3.5 4.42831 3.5 3.50005ZM5.5 3.50005C5.5 3.79672 5.58797 4.08673 5.7528 4.33341C5.91762 4.58008 6.15189 4.77234 6.42597 4.88587C6.70006 4.9994 7.00166 5.02911 7.29264 4.97123C7.58361 4.91335 7.85088 4.77049 8.06066 4.56071C8.27044 4.35093 8.4133 4.08366 8.47118 3.79269C8.52906 3.50172 8.49935 3.20012 8.38582 2.92603C8.27229 2.65194 8.08003 2.41767 7.83335 2.25285C7.58668 2.08803 7.29667 2.00005 7 2.00005C6.60218 2.00005 6.22064 2.15809 5.93934 2.43939C5.65804 2.7207 5.5 3.10223 5.5 3.50005ZM14 13.0001V15.0001H0V13.0001C0 13.0001 0 9.00005 7 9.00005C14 9.00005 14 13.0001 14 13.0001ZM12 13.0001C11.86 12.2201 10.67 11.0001 7 11.0001C3.33 11.0001 2.07 12.3101 2 13.0001M13.95 9.00005C14.5629 9.47678 15.064 10.0819 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13.0001V15.0001H20V13.0001C20 13.0001 20 9.37005 13.94 9.00005H13.95Z"
                                    />
                                </svg>
                                <span className="ml-3">My Team</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/dashboard/leaderboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-8 h-8 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 19H9V12.5V8.6C9 8.26863 9.26863 8 9.6 8H14.4C14.7314 8 15 8.26863 15 8.6V14.5V19Z" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M15 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path
                                            d="M20.4 19H15V15.1C15 14.7686 15.2686 14.5 15.6 14.5H20.4C20.7314 14.5 21 14.7686 21 15.1V18.4C21 18.7314 20.7314 19 20.4 19Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path
                                            d="M9 19V13.1C9 12.7686 8.73137 12.5 8.4 12.5H3.6C3.26863 12.5 3 12.7686 3 13.1V18.4C3 18.7314 3.26863 19 3.6 19H9Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                                <span className="ml-3">Leaderboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://discord.gg/WfMhAuWx" target='_blank' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-8 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid" fill="currentColor">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <path
                                                d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                                                fill="#none" fill-rule="nonzero"> </path>
                                        </g>
                                    </g>
                                </svg>
                                <span className="ml-3">Discord</span>
                            </Link>
                        </li>

                        <li>
                            <div onClick={handleSignOut} className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-8 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.22222 2.22222H10V0H2.22222C1 0 0 1 0 2.22222V17.7778C0 19 1 20 2.22222 20H10V17.7778H2.22222V2.22222ZM20 10L15.5556 5.55556V8.88889H6.66667V11.1111H15.5556V14.4444L20 10Z"
                                    />
                                </svg>
                                <span className="ml-3">Sign out</span>
                            </div>
                        </li>
                    </ul>
                    <div className="mt-auto">
                        <div onClick={() => { window.location.href = "/" }} className="backtohome cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ml-3">Back to Home Page</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
