import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {
  Avatar,
  Button,
  Icon,
  TextArea,
  Label,
  Text,
  Flow,
  Flex,
} from '../common';
import {CARD, Data, MASTER} from '../../graphql/query';
import * as GQLType from '../../../server/graphql/type';
import useTextArea from '../../hooks/useTextArea';
import useVisibility from '../../hooks/useVisiblity';
import InviteFriendModal from '../Infobar/InviteFriendModal';
import {Cover, Labels} from '../Card/Utils';
import InfoLabel from '../common/InfoLabel';

const CardModal = ({
  setVisibility,
  id,
}: {
  setVisibility: () => void;
  id: string;
}) => {
  const theme = useTheme();
  const data = useQuery<{card: GQLType.Card}, {id: string}>(CARD, {
    variables: {id},
  });
  const ctx = useQuery<Data, {id: string}>(MASTER, {
    variables: {id: '6182d8c9bba2b2dfab68119d'},
    fetchPolicy: 'cache-only',
  });

  const [card, setCard] = useState<GQLType.Card | undefined>();
  const descriptionController = useTextArea(
    card?.description || "There's no description yet"
  );
  const commentController = useTextArea(card?.description);

  const [showMember, setShowMember] = useVisibility();
  const [showLabel, setShowLabel] = useVisibility();
  const [showCover, setShowCover] = useVisibility();

  useEffect(() => {
    if (data.data) {
      setCard(data.data.card);
    }
  }, [data.data]);

  if (!(card && ctx.data)) return <div>Loading</div>;

  return (
    <div
      style={{
        backgroundColor: `hsl(${theme.color.DARK} / 0.1)`,
        backdropFilter: 'blur(1rem)',
        position: 'fixed',
        inset: '0',
        margin: 'auto',
        zIndex: theme.z.CARD,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          margin: '4em auto',
          maxWidth: '45%',
          padding: '2em 1.75em',
        }}
      >
        {/* Header */}
        <div className="header">
          <Flow>
            <Button.Squared onClick={setVisibility}>
              <Icon.Close />
            </Button.Squared>
            {card.coverId && (
              <img
                src={`https://source.unsplash.com/${card.coverId}/620x130`}
              />
            )}
            <Text>{card.title}</Text>
            <Text>
              in list
              <Text as="span"> {card.list.name}</Text>
            </Text>
          </Flow>
        </div>
        {/* Card Content */}
        <Flex>
          {/* Left hand side */}
          <div style={{flex: 4}}>
            {/* Subheading */}
            <Flex>
              <InfoLabel text="Description">
                <Icon.Description />
              </InfoLabel>
              <Button.Icon>
                <Icon.Edit />
                <Text>Edit</Text>
              </Button.Icon>
            </Flex>

            {/* Content */}
            <div className="content">
              {/* Description */}
              <TextArea disabled {...descriptionController} />
              {/* Attachment */}
              <Flex>
                <InfoLabel text="Attachments">
                  <Icon.AttachFile />
                </InfoLabel>
                <Button.Icon>
                  <Icon.Add />
                  <Text>Add</Text>
                </Button.Icon>
              </Flex>
              {card.attachments.map(attachment => (
                <Attachment key={attachment.title} attachment={attachment} />
              ))}
            </div>

            <div className="comments" style={{backgroundColor: 'white'}}>
              <Flex
                className="commentForm"
                style={{
                  border: '1px solid red',
                  borderRadius: '8px',
                  padding: '1em',
                  flexDirection: 'column',
                }}
              >
                <Flex style={{alignItems: 'center'}}>
                  <Avatar
                    id={ctx.data?.authorizedUser.avatar}
                    username={ctx.data?.authorizedUser.username}
                  />
                  <TextArea
                    {...commentController}
                    placeholder="Write a comment..."
                  />
                </Flex>
                <Button.Colored
                  style={{padding: '0.5em 1em', alignSelf: 'flex-end'}}
                >
                  Comment
                </Button.Colored>
              </Flex>
              <div className="commentList">
                {card.comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>

          {/* Right hand side */}
          <Flow>
            {/* Label */}
            <InfoLabel text="Actions">
              <Icon.AccountCircle />
            </InfoLabel>
            {/* Members */}
            <div style={{position: 'relative'}}>
              <Button.Icon onClick={setShowMember}>
                <Icon.People />
                <Text>Members</Text>
              </Button.Icon>
              {showMember && <Member user={ctx.data.authorizedUser} />}
            </div>
            {/* Labels */}
            <div style={{position: 'relative'}}>
              <Button.Icon onClick={setShowLabel}>
                <Icon.Label />
                <Text>Labels</Text>
              </Button.Icon>
              {showLabel && <LabelModal labels={card.labels} />}
            </div>
            {/* Covers */}
            <div style={{position: 'relative'}}>
              <Button.Icon onClick={setShowCover}>
                <Icon.Image />
                <Text>Cover</Text>
              </Button.Icon>
              {showCover && <Cover />}
            </div>
          </Flow>
        </Flex>
      </div>
    </div>
  );
};

const Attachment = ({attachment}: {attachment: GQLType.Attachment}) => {
  const date = new Date(attachment.createdAt).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div style={{display: 'flex', maxWidth: '100%'}}>
      <div style={{maxWidth: '15%'}}>
        {attachment.coverId ? (
          <img
            src={`https://source.unsplash.com/${attachment.coverId}`}
            alt=""
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <p>added {date}</p>
        <p>{attachment.title}</p>
        <div>
          <a href={attachment.url}>Download</a>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

const Comment = ({comment}: {comment: GQLType.Comment}) => {
  const commentDate = new Date(comment.createdAt).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div>
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {/* Comment's User */}
        <div style={{display: 'flex'}}>
          <Avatar id={comment.user.avatar} username={comment.user.username} />
          <div>
            <p>{comment.user.username}</p>
            <p>{commentDate}</p>
          </div>
        </div>
        {/* Actions */}
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      {/* Content */}
      <div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

const Member = ({user}: {user: GQLType.User}) => {
  const friends = user.friends;
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 7,
      }}
    >
      {/* This card members */}
      <h4>Members</h4>
      <h5>Assign members to this card </h5>
      {/* Invite some people from the board */}
      <InviteFriendModal friends={friends} />
    </div>
  );
};
const LabelModal = ({labels}: {labels: GQLType.Label[]}) => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 7,
      }}
    >
      {/* Header */}
      <div>
        <h4>Label</h4>
        <h5>Select a name and a color</h5>
      </div>

      {/* Labels */}
      <div>
        <input type="text" style={{width: '100%'}} />
        <div
          style={{
            display: 'grid',
            grid: 'repeat(3, 2.5rem) / repeat(4, 4rem)',
          }}
        >
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span className="material-icons">&#xe892;</span>
        <p>Available</p>
        <Labels>
          {labels.map(label => (
            <Label color={label.color} key={label.id}>
              {label.text}
            </Label>
          ))}
        </Labels>
      </div>
    </div>
  );
};
// const Cover = () => {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         backgroundColor: 'red',
//         zIndex: 7,
//       }}
//     >
//       Cover
//     </div>
//   );
// };

export default CardModal;
