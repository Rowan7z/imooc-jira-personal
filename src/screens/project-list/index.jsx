import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("apiUrl: ", apiUrl);

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  useEffect(() => {
    fetch(
      // `${apiUrl}/projects?name=${param.name}personId=&${param.personId}`
      `${apiUrl}/projects?${qs.stringify(cleanObject(param))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
