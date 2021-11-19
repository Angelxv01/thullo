/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Navigation from './components/Navigation';
import {
  Button,
  Container,
  Flex,
  Flow,
  Icon,
  Label,
  Text,
} from './components/common';
import {useQuery} from '@apollo/client';
import {MASTER} from './query';
import Infobar from './components/Infobar';
import {useTheme} from 'styled-components';
import Avatars from './components/Avatars';
import {IUser} from '../types';

const App = () => {
  const theme = useTheme();
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});

  if (!ctx.data) return null;

  // console.log(ctx.data);

  return (
    <Container>
      <Navigation />
      <Infobar />
      {/* Board */}
      <Flex
        as="main"
        className="board"
        style={{
          marginInline: '2em',
          paddingInline: '1em',
          overflowX: 'scroll',
          backgroundColor: `hsl(${theme.color.WHITE1})`,
          borderRadius: theme.border.radius[3],
        }}
      >
        {ctx.data.board.lists.map(
          (list: {
            id: string;
            name: string;
            cards: {
              id: string;
              title: string;
              coverId?: string;
              labels: {id: string; text: string; color: string}[];
              members: IUser[];
              attachments: {id: string}[];
              comments: {id: string}[];
            }[];
          }) => (
            <div
              key={list.id}
              style={{
                flex: 1,
                minWidth: '20em',
              }}
            >
              <Header name={list.name} />
              <Flow>
                {list.cards.map(card => (
                  <Flow
                    key={card.id}
                    style={{
                      backgroundColor: `hsl(${theme.color.WHITE})`,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                      borderRadius: `${theme.border.radius[2]}`,
                      padding: '1em',
                    }}
                  >
                    {card.coverId && (
                      <img
                        src={`https://source.unsplash.com/${card.coverId}`}
                        style={{
                          aspectRatio: '5 / 3',
                          borderRadius: theme.border.radius[1],
                        }}
                      />
                    )}
                    <Text
                      fontFamily={theme.font.family.secondary}
                      fontWeight="400"
                      fontSize={theme.font.size['500']}
                      lineHeight={theme.lineHeight[2]}
                      color="DARK"
                    >
                      {card.title}
                    </Text>
                    <Flex
                      style={{
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.25em',
                      }}
                    >
                      {card.labels.map(label => (
                        <Label color={label.color} key={label.id}>
                          {label.text}
                        </Label>
                      ))}
                    </Flex>
                    <Flex
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Avatars members={card.members}>
                          <Button.Squared>
                            <Icon.Add />
                          </Button.Squared>
                        </Avatars>
                      </div>
                      <Flex>
                        {card.comments.length > 0 && (
                          <Flex
                            space="0.25em"
                            style={{
                              alignItems: 'center',
                              color: `hsl(${theme.color.GRAY4})`,
                            }}
                          >
                            <Icon.Comment
                              style={{fontSize: theme.font.size[200]}}
                            />
                            <Text>{card.comments.length}</Text>
                          </Flex>
                        )}
                        {card.attachments.length > 0 && (
                          <Flex
                            space="0.25em"
                            style={{
                              alignItems: 'center',
                              color: `hsl(${theme.color.GRAY4})`,
                            }}
                          >
                            <Icon.AttachFile
                              style={{fontSize: theme.font.size[200]}}
                            />
                            <Text>{card.attachments.length}</Text>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                  </Flow>
                ))}
              </Flow>
            </div>
          )
        )}
      </Flex>
    </Container>
  );
};

const Header = ({name}: {name: string}) => {
  const theme = useTheme();

  return (
    <Flex style={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Text lineHeight={theme.lineHeight[2]} fontSize={theme.font.size[400]}>
        {name}
      </Text>
      <Icon.MoreHoriz />
    </Flex>
  );
};

export default App;
