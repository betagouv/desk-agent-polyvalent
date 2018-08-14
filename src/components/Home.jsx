import React from "react";
import {
  Container,
  Header as TextHeader,
  Message,
  Search,
  Input,
  Icon,
  List,
  Label,
  Image
} from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

import { LinksContainer } from "Components";
import Data from "Data";

const style = { marginTop: "3em" };

export default class Home extends React.Component {
  state = {
    informationIsVisible: false,
    searchingLoading: false,
    inputSearchValue: ""
  };

  componentDidMount() {}
  componentWillUnmount() {}

  toggleInformationsVisibility = () =>
    this.setState({ informationIsVisible: !this.state.informationIsVisible });

  search = () => {
    if (this.state.inputSearchValue === "") {
      this.setState({
        searchingLoading: false
      });
    } else {
      this.setState({
        searchingLoading: true
      });
    }
    this.setState({ searchingLoading: true });

    let googleSearchURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDOhofRtJJoZSZ3Jw77Nc6_xA5rvi7fEzg&cx=016550067971777540424:on93fby9gya&q=${
      this.state.inputSearchValue
    }`;

    return fetch(googleSearchURL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ searchingLoading: false, searchResults: json.items });
      });
  };

  updateInputValue = event => {
    this.setState({
      inputSearchValue: event.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  getLinkIcon = link => {
    const SERVICE_PUBLIC_URL = "www.service-public.fr";

    if (link.includes(SERVICE_PUBLIC_URL)) {
      const lastPartOfURL = link.substr(link.lastIndexOf("/") + 1);

      if (lastPartOfURL.startsWith("F")) {
        return (
          <List.Icon className="fas fa-info-circle" verticalAlign="middle" />
        );
      } else if (lastPartOfURL.startsWith("R")) {
        return (
          <List.Icon className="fas fa-clipboard-list" verticalAlign="middle" />
        );
      } else if (lastPartOfURL.startsWith("A") || link.includes("actualites")) {
        return (
          <List.Icon className="far fa-newspaper" verticalAlign="middle" />
        );
      } else if (lastPartOfURL.startsWith("N")) {
        return <List.Icon className="fas fa-folder" verticalAlign="middle" />;
      }
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Container text style={style}>
          <Input
            icon
            placeholder="Chercher une information ou une démarche..."
            size="big"
            fluid
          >
            <input
              style={{ borderRadius: "500rem" }}
              onChange={event => this.updateInputValue(event)}
              onKeyPress={this.handleKeyPress}
            />
            <Icon name="search" link onClick={this.search} />
          </Input>
        </Container>
        {this.state.searchingLoading || this.state.searchResults ? (
          <Container style={style}>
            {this.state.searchingLoading ? (
              <Loader active inline="centered" />
            ) : null}
            <List divided verticalAlign="middle" size="big" link relaxed>
              {Array.isArray(this.state.searchResults)
                ? this.state.searchResults.map(result => {
                    const displayLinkUrl = `http://${result.displayLink}`;
                    return (
                      <List.Item
                        key={result.title}
                        style={{ marginTop: "0.3em" }}
                      >
                        <List.Content floated="right">
                          <Label>
                            <a href={displayLinkUrl} style={{ color: "black" }}>
                              {result.displayLink}
                            </a>
                          </Label>
                        </List.Content>
                        {this.getLinkIcon(result.link)}
                        <List.Content>
                          <a href={result.link}>
                            <List.Header
                              as="h4"
                              style={{ marginBottom: "0.2em" }}
                            >
                              {result.title}
                            </List.Header>
                            {result.snippet}
                          </a>
                        </List.Content>
                      </List.Item>
                    );
                  })
                : null}
            </List>
          </Container>
        ) : (
          <div>
            <LinksContainer
              name="Démarches"
              icon={<i className="fas fa-clipboard-list" />}
              links={Data.demarches}
            />
            <LinksContainer
              name="Informations"
              icon={<i className="fas fa-info-circle" />}
              links={Data.informations}
            />
          </div>
        )}
      </div>
    );
  }
}
