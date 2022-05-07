const redirectServerSide = (link: string) => {
  return {
    redirect: {
      permanent: false,
      destination: link,
    },
  };
};

export default redirectServerSide;
