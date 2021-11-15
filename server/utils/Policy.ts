interface EditPolicy {
  canComment: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface AccessPolicy {
  canRemoveAdmin: boolean;
  canRemoveMember: boolean;
  canInviteUser: boolean;
  canAddUser: boolean;
}

interface Policies extends EditPolicy, AccessPolicy {}

const BASE: Policies = {
  canComment: false,
  canEdit: false,
  canDelete: false,
  canRemoveAdmin: false,
  canRemoveMember: false,
  canInviteUser: false,
  canAddUser: false,
};

export const OWNER: Policies = {
  canComment: true,
  canEdit: true,
  canDelete: true,
  canRemoveAdmin: true,
  canRemoveMember: true,
  canInviteUser: true,
  canAddUser: true,
};

export const ADMIN: Policies = {
  ...BASE,
  canRemoveMember: true,
};
