import Head from 'next/head';

interface CustomHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{title || 'Hackathon | E-Cell IIT Hyderabad - NPCI'}</title>
            <meta name="description" content={description || 'Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get change to get Placement/Internship offer from NPCI.'} />
            <meta name="keywords" content={keywords || 'Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest'} />
            <meta name="author" content='Web Team E-Cell' />
        </Head>
    );
};

export default CustomHead;
