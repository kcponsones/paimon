import "@/src/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/libs/theme";
import { UserProvider } from "@/libs/providers/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Loader from "@/components/Loader";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Loader />
            <Component {...pageProps} />
            <Analytics />
          </UserProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
