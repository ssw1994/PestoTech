import { filteredList } from "./finder.selector";
import { ActionStatus, ListTypes } from "../../models/constants";
let mockState = {
  finder: {
    userStatus: ActionStatus.success,
    userList: [
      { id: 1, name: "Reyna Dorcey", location: "United States" },
      { id: 2, name: "Fredra Swatten", location: "Portugal" },
      {
        id: 3,
        name: "The Lord of the Rings: The Return of the King",
        location: "Russia",
      },
      { id: 4, name: "The Lion King", location: "China" },
      { id: 5, name: "Kennan Margaretta", location: "China" },
      { id: 6, name: "Marice Youde", location: "China" },
    ],
    companyStatus: ActionStatus.success,
    companyList: [
      { id: 1, company: "Flashdog", location: "Russia" },
      { id: 2, company: "Skinix", location: "South Africa" },
      { id: 3, company: "Topicware", location: "Indonesia" },
      { id: 4, company: "Jaxbean", location: "Ukraine" },
      { id: 5, company: "Feedfire", location: "Bolivia" },
      { id: 6, company: "Tagtune", location: "Poland" },
      { id: 7, company: "Pixonyx", location: "Philippines" },
      { id: 8, company: "Plambee", location: "China" },
    ],
    listType: ListTypes.user,
    filters: {
      key: null,
    },
  },
};
describe("when filteredList is called", () => {
  it("should return userList if listType is users", () => {
    const result = filteredList(mockState);
    expect(result).toContainEqual({
      id: 1,
      name: "Reyna Dorcey",
      location: "United States",
    });
  });
  it("list should contain 6 user items", () => {
    const result = filteredList(mockState);
    expect(result).toHaveLength(6);
  });
  it("should return companyList if listType is company", () => {
    mockState = {
      ...mockState,
      finder: {
        ...mockState.finder,
        listType: ListTypes.company,
      },
    };
    const result = filteredList(mockState);

    expect(result).toContainEqual({
      id: 1,
      company: "Flashdog",
      location: "Russia",
    });
  });

  it("list should contain 8 company items", () => {
    const result = filteredList(mockState);
    expect(result).toHaveLength(8);
  });

  it("should filter list is user search for (relative search)", () => {
    mockState = {
      ...mockState,
      finder: {
        ...mockState.finder,
        listType: ListTypes.user,
        filters: {
          key: "the king",
        },
      },
    };
    const result = filteredList(mockState);
    expect(result).toContainEqual({
      id: 3,
      name: "The Lord of the Rings: The Return of the King",
      location: "Russia",
    });
    expect(result).toContainEqual({
      id: 4,
      name: "The Lion King",
      location: "China",
    });
  });
  it("should filter list is user search for (absolute search)", () => {
    mockState = {
      ...mockState,
      finder: {
        ...mockState.finder,
        listType: ListTypes.user,
        filters: {
          key: '"the king"',
        },
      },
    };
    const result = filteredList(mockState);
    expect(result).toContainEqual({
      id: 3,
      name: "The Lord of the Rings: The Return of the King",
      location: "Russia",
    });

    expect(result).not.toContainEqual({
      id: 4,
      name: "The Lion King",
      location: "China",
    });
  });
});
