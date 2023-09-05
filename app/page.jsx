import Feed from "@components/Feed";

const Home = () => {
  return (
    <div className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br /* className="max-sm:hidden" */ />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptMania is an open-source AI prompting tool for modern world to
        dicover, create and share creative prompts.
      </p>

      <Feed />
    </div>
  );
};

export default Home;
