import React from "react";
import PropTypes from 'prop-types';
import { ItemContactList } from "./ItemContactList";

export const ContactList = ({ value, onDeleteContact }) => {
  return (
    <ul>
      {value.map(({id, name, number}) => {
        return (
          <ItemContactList
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact} />
        )
      })}
    </ul>
  )
};

ContactList.prototype = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func,
};