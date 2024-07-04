import Navbar from "@/app/components/Navbar";
import RegistrationForm from "@/app/components/registerComponent";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Session from 'supertokens-auth-react/recipe/session';
import { getSessionUser } from '@/app/api/auth';
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleMenuClick = (newMenuState: boolean) => {
    setMenuOpen(newMenuState);
  };

  const checkSession = async () => {
    try {
      if (await Session.doesSessionExist()) {
        const user = await getSessionUser();
        if (user.isRegisterd) {
          user.isAdmin ? router.replace('/admin') : router.replace('/dashboard');
          return;
        }
        if (!user.isEligible) {
          setEmail("");
        } else {
          setEmail(user.email);
        }
        setLoading(false);
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
            <Box minHeight="100vh" flex="1" className="">
              <Heading fontSize='currentSize' fontWeight="500" className="registration_heading">Register your team</Heading>
              <RegistrationForm email={email} />
            </Box>
          </Flex>
        )}
      </Box>
    </div>
  );
}

export default Register;
