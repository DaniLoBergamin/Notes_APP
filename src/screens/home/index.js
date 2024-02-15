import React, { Fragment } from 'react';
import HomeImage from '../../assets/images/homeimage.gif';
import Header from "../../components/header";
import { Column, Section, Title, Container } from "rbx";
import '../../styles/home.scss';
import { Link } from 'react-router-dom';

const HomeScreen = () => (
    <Fragment>
        <Header/>
            <Section size="medium" className="home">
                <Container>
                    <Column.Group>
                        <Column size={5}>
                            <Title size={1} spaced className="has-text-white">
                                Get organized
                            </Title>
                            <Title size={4} spaced className="has-text-light" subtitle>
                                Create your notes and access them quickly and easily, wherever you are.
                                
                            </Title>
                                <Link to='/register' className="button is-outlined is-light is-large">
                                    <strong>Register for free Now</strong>
                                </Link>
                                
                        </Column>
                        <Column size={5} offset={2}>
                                    <img alt='Home' src={HomeImage} />
                                </Column>
                    </Column.Group>
                    
                </Container>
            </Section>
    </Fragment>
)

export default HomeScreen;