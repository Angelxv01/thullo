import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {Avatar, Button, Icon, TextArea, Label} from '../common';
import {CARD, Data, MASTER} from '../../graphql/query';
import * as GQLType from '../../../server/graphql/type';
import useTextArea from '../../hooks/useTextArea';
import useVisibility from '../../hooks/useVisiblity';
import InviteFriendModal from '../Infobar/InviteFriendModal';
import {Labels} from '../Card/Utils';

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
  const controller = useTextArea(card?.description);

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
        style={{backgroundColor: 'white', margin: '4em auto', maxWidth: '45%'}}
      >
        {/* Header */}
        <div className="header">
          <Button.Squared onClick={setVisibility}>
            <Icon.Close />
          </Button.Squared>
          {card.coverId && (
            <img
              src={`https://source.unsplash.com/${card.coverId}/620x130`}
              alt="Card Cover"
            />
          )}

          <h1>{card.title}</h1>
          <p>
            <span>in list </span>
            {card.list.name}
          </p>
        </div>
        {/* Card Content */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {/* Left hand side */}
          <div style={{flex: 4}}>
            {/* Subheading */}
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span className="material-icons">&#xe873;</span>
              <p>Description</p>
              <button>
                <div
                  style={{display: 'flex', alignItems: 'center'}}
                  // onClick={() => setDisabled(false)}
                >
                  <span className="material-icons">&#xe3c9;</span>
                  <p>Edit</p>
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="content">
              {/* Description */}
              <TextArea disabled {...controller} />
              {/* Attachment */}
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span className="material-icons">&#xe873;</span>
                <p>Attachments</p>
                <button>
                  <p>
                    <span>+</span> Add
                  </p>
                </button>
              </div>
              {card.attachments.map(attachment => (
                <Attachment key={attachment.title} attachment={attachment} />
              ))}
            </div>

            <div className="comments" style={{backgroundColor: 'white'}}>
              <div className="commentForm">
                <div style={{display: 'flex'}}>
                  <Avatar
                    id={ctx.data?.authorizedUser.avatar || ''}
                    username={ctx.data?.authorizedUser.username}
                  />
                  <TextArea {...controller} />
                </div>
                <button>Comment</button>
              </div>
              <div className="commentList">
                {card.comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>

          {/* Right hand side */}
          <div style={{flex: 1}}>
            {/* Label */}
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span className="material-icons">&#xe853;</span>
              <p>Actions</p>
            </div>
            {/* Call to actions */}
            <div
              style={{
                zIndex: 5,
              }}
            >
              {/* Members */}
              <div style={{position: 'relative'}}>
                <button onClick={setShowMember}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="material-icons">&#xe7fb;</span>
                    <p>Members</p>
                  </div>
                </button>
                {showMember && <Member user={ctx.data.authorizedUser} />}
              </div>
              {/* Labels */}
              <div style={{position: 'relative'}}>
                <button onClick={setShowLabel}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="material-icons">&#xe892;</span>
                    <p>Labels</p>
                  </div>
                </button>
                {showLabel && <LabelModal labels={card.labels} />}
              </div>
              {/* Covers */}
              <div style={{position: 'relative'}}>
                <button onClick={setShowCover}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="material-icons">&#xe3f4;</span>
                    <p>Cover</p>
                  </div>
                </button>
                {showCover && <Cover />}
              </div>
            </div>
          </div>
        </div>
        {data.data?.card.title}
      </div>
    </div>
  );
};

const Attachment = ({attachment}: {attachment: GQLType.Attachment}) => {
  const date = attachment.createdAt.toLocaleString().substr(0, 10);
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
const Cover = () => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 7,
      }}
    >
      Cover
    </div>
  );
};

export default CardModal;
