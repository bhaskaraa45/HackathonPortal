import Navbar from "@/app/components/Navbar";
import RegistrationForm from "@/app/components/registerComponent";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Session from 'supertokens-auth-react/recipe/session';
import { getSessionUser } from '@/app/api/auth';
import { useRouter } from "next/router";
import axios from "axios";
import CustomModal from "@/app/components/customModal";
import styles from '@/styles/home.module.css'
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [closed, setClosed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();


  const fetchDate = async () => {
    try {
      const response = await axios.get(`${backendUrl}/date`);
      const date = new Date(response.data).getTime();

      const now = new Date().getTime();
      const distance = date - now;

      if (distance <= 0) {
        setClosed(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching date:', error);
    }
  };

  const checkSession = async () => {
    try {
      if (await Session.doesSessionExist()) {
        const user = await getSessionUser();
        if (user.isRegisterd) {

          setShowModal(true)
          setEmail(user.email);
          setLoading(false);
          // user.isAdmin ? router.replace('/admin') : router.replace('/dashboard');
          return;
        }
        if (!user.isEligible) {
          setEmail("");
        } else {
          setEmail(user.email);
        }
        await fetchDate();
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (closed) {
    return (
      <div className={styles.home}>
        <Navbar />
        <CustomModal title='Registration Closed' isOpen={true} onClose={() => router.replace('/')} description='Registration for the NPCI x E-Cell IIT Hyderabad Hackathon is closed!' />
      </div>
    );
  }

  const onClose = async () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div>
      <Navbar />

      <Box mt={{ base: "64px", lg: "94px" }}>
        {loading ? (
          <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Flex height="100vh">
            <CustomModal
              isOpen={showModal}
              title={'Email Already Registered'}
              description={'The email is already registered with a team.'}
              onClose={onClose}
            />
            <Box minHeight="100vh" flex="1" className="">
              <Heading fontSize={{ base: '1.75rem', md: "2rem" }} fontWeight="500" className="registration_heading">Register your team</Heading>
              <RegistrationForm email={email} />
            </Box>
          </Flex>
        )}
      </Box>
    </div>
  );
}

export default Register;
