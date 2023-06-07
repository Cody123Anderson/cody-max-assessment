import { Page } from "./common/Page";

export const MyList = () => {
  return (
    <Page showMyListButton={false}>
      <h1 className="text-center mt-8 mb-20 font-bold text-xl">My List</h1>
      <div className="flex justify-center align-middle">
        <div className="text-center">
          <p className="font-bold">No artists in list yet</p>
          <p className="text-sm">Add artists from the search page to get them to show up here</p>
        </div>
      </div>
    </Page>
  );
}