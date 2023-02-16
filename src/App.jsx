import React, { Component } from "react";
import { nanoid } from "nanoid";
import css from "../src/App.module.css"
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
state = {
  contacts: [
    // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }
  
  addContact = ({ name, number }) => {
    const addContact = { id: nanoid(), name, number }
    
    const newContact = this.state.contacts.some(contact => contact.name === name)

    if (newContact) {
      alert(`${name} is already in contacts. `)
    } else {
      this.setState(prevState => ({
        contacts:[addContact, ...prevState.contacts]
      }))
    }
  }
  
  changeFilter = evt => {
    this.setState({filter: evt.target.value})
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state
    const normalizedFilter = filter.toLowerCase()

    return (
      contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter))
    )    
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact=>contact.id !== contactId)
    }))
  }

  // монтуємо Contact або щось з localStorage
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contact);   

    // console.log(parsedContact);
    // щоб не зламалось коли вперше зайшов юзер
    if (parsedContact) {
      this.setState({ contacts: parsedContact })
    }    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("App componentDidUpdate")
    
    if (this.state.contacts !== prevState.contacts) {
      console.log("Оновилось поле Contact, записуємо Contact в localStorage")

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


  render() {
    const { filter } = this.state
    const visibleContacts = this.getVisibleContacts()

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />      
      
        <h2 className={css.title}>Contacts</h2>
        
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList value={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    )      
  }
}

