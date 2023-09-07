import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      {data.length > 0 && (
        <div className="mt-10 prompt_layout">
          {data?.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}

      {data.length == 0 && (
        <div className="mt-10">
          <p className="text-gray-600 text-lg sm:text-md text-left">
            {name == "My"
              ? "You don't have any prompts. Create a prompt to see one."
              : "No prompts for this user"}
          </p>
        </div>
      )}
    </section>
  );
};

export default Profile;
