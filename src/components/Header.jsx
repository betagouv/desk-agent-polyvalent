import React from "react";
import { Container, Header as TextHeader, Grid, Menu } from "semantic-ui-react";

import Data from "Data";

export default class Header extends React.Component {
  state = {};

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const MAX_NUMBER = 1000;
    let randomNumber = Math.floor(Math.random() * MAX_NUMBER + 1);
    let homeURLWithReload = "/home?reload=" + randomNumber;

    const linkType = Data.encartTypes;
    const links = Object.keys(linkType).reduce((newObject, key) => {
      newObject[key] = homeURLWithReload + "#" + key;
      return newObject;
    }, {});

    return (
      <div
        style={{
          paddingBottom: "1em"
        }}
      >
        <Container>
          <Grid columns="2">
            <Grid.Column floated="left" streched="true">
              <Grid>
                <Grid.Column
                  mobile={4}
                  tablet={2}
                  computer={2}
                  style={{ textAlign: "right" }}
                  verticalAlign="middle"
                >
                  <i style={{ fontSize: "2em" }} className="fas fa-desktop" />
                </Grid.Column>
                <Grid.Column width={11}>
                  <TextHeader as="h1" style={{ margin: "0.5em 0 0em 0" }}>
                    <a style={{ color: "black" }} href="/home">
                      Desk Agent Polyvalent
                    </a>
                  </TextHeader>
                  <span>Cahors</span>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column
              floated="right"
              style={{ marginTop: "1.5em", textAlign: "right" }}
              streched="true"
            >
              <Menu text stackable floated="right">
                <Menu.Item
                  as="a"
                  href={links.demarches}
                  link
                  name={linkType.demarches}
                >
                  <i className="fas fa-clipboard-list" />{" "}
                  <span style={{ marginLeft: "0.5em" }}>Démarches</span>
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href={links.informations}
                  link
                  name="informations"
                >
                  <i className="fas fa-info-circle" />
                  <span style={{ marginLeft: "0.5em" }}>Informations</span>
                </Menu.Item>
                <Menu.Item as="a" href={links.reseau} link name="reseau">
                  <i className="fas fa-hands-helping" />
                  <span style={{ marginLeft: "0.5em" }}>Réseau</span>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
