import { useProgressbar } from "@/libs/hooks/useProgressbar";
import {
  LoaderElementsDarkImg,
  LoaderElementsLightImg,
  PaimonLoaderImg,
} from "@/libs/includes/image";
import {
  LoaderBelowWrapper,
  LoaderBorder,
  LoaderElementsPassieve,
  LoaderElementsPrompt,
  LoaderElementsWrapper,
  LoaderScreenBox,
  LoaderScreenContent,
} from "@/src/styles/Loader";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const transitionSpeed = 600;

const Loader: React.FC = (props?: Parameters<typeof useProgressbar>[0]) => {
  const { events } = useRouter();

  const { width, start, complete, reset } = useProgressbar({
    transitionSpeed,
    ...props,
  });

  useEffect(() => {
    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", complete);
    events.on("routeChangeError", reset);

    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", complete);
      events.off("routeChangeError", reset);
    };
  }, [events]);

  const percentProgress = (percent: number) => {
    return (percent * 440) / 100;
  };

  return width > 0 ? (
    <LoaderScreenBox>
      <LoaderScreenContent>
        <Image src={PaimonLoaderImg} width="150px" alt="paimon-img-loader" />
      </LoaderScreenContent>
      <LoaderBelowWrapper>
        <LoaderBorder />
        <LoaderElementsWrapper>
          <LoaderElementsPassieve imgsrc={LoaderElementsDarkImg} />

          <LoaderElementsPrompt
            src={LoaderElementsLightImg}
            alt="loader-elements-dark"
            margin="0 auto"
            percentload={percentProgress(width)}
          />
        </LoaderElementsWrapper>
      </LoaderBelowWrapper>
    </LoaderScreenBox>
  ) : null;
};

export default Loader;
