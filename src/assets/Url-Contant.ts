export class UrlContant {
  // private static readonly baseUrl = 'http://192.168.68.84:8080/api/';

  private static readonly baseUrl = 'https://ourgoodneighbour.fun/api/';

  public static readonly authenticateUrl = `${UrlContant.baseUrl}authenticate`;
  public static readonly CreateRoleUrl = `${UrlContant.baseUrl}role/createRole`;
  public static readonly EditRoleUrl = `${UrlContant.baseUrl}role/editeRole`;
  public static readonly SearchRoleUrl = `${UrlContant.baseUrl}role/searchRoleUrl`;
  public static readonly GetRoleByIDUrl = `${UrlContant.baseUrl}role/getRoleByID`;
  public static readonly DeleteRoleByIDUrl = `${UrlContant.baseUrl}role/deleteRoleByID`;

  public static readonly CreateRewardUrl = `${UrlContant.baseUrl}reward/createReward`;
  public static readonly EditRewardUrl = `${UrlContant.baseUrl}reward/editReward`;
  public static readonly SearchRewardUrl = `${UrlContant.baseUrl}reward/getAllReward`;
  public static readonly GetRewardByIDUrl = `${UrlContant.baseUrl}reward/getRewardByID`;
  public static readonly DeleteRewardByIDUrl = `${UrlContant.baseUrl}reward/deleteRewardByID`;
  public static readonly GetLeaderBoardDetailsUrl = `${UrlContant.baseUrl}reward/getLeaderBoardDetails`;
  public static readonly getAllRewardHistoryUrl = `${UrlContant.baseUrl}reward/getAllRewardHistory`;
  public static readonly filterRewardHistoryUrl = `${UrlContant.baseUrl}reward/filterRewardHistory`;

  public static readonly LoginUrl = `${UrlContant.baseUrl}user/login`;
  public static readonly CreateUserUrl = `${UrlContant.baseUrl}user/createUser`;
  public static readonly EditUserUrl = `${UrlContant.baseUrl}user/editUser`;
  public static readonly SearchUserUrl = `${UrlContant.baseUrl}user/getAllUser`;
  public static readonly GetUserByIDUrl = `${UrlContant.baseUrl}user/getUserByID`;
  public static readonly DeleteUserByIDUrl = `${UrlContant.baseUrl}user/deleteUserByID`;
  public static readonly AssignUserEventUrl = `${UrlContant.baseUrl}user/assignUserEvent`;
  public static readonly processUserFromEventUrl = `${UrlContant.baseUrl}user/processUserFromEvent`;
  public static readonly getAllUserFromEventUrl = `${UrlContant.baseUrl}user/getAllUserFromEvent`;
  public static readonly deleteUserFromEventUrl = `${UrlContant.baseUrl}user/deleteUserFromEvent`;
  public static readonly getAllUserEventUrl = `${UrlContant.baseUrl}user/getAllUserEvent`;
  public static readonly getAllUserEventsByIDUrl = `${UrlContant.baseUrl}user/getAllUserEventsByID`;
  public static readonly getAllUserAssignedListUrl = `${UrlContant.baseUrl}user/getAllUserAssignedList`;

  public static readonly CreateContactUrl = `${UrlContant.baseUrl}contact/createContact`;
  public static readonly EditContactUrl = `${UrlContant.baseUrl}contact/editContact`;
  public static readonly SearchContactUrl = `${UrlContant.baseUrl}contact/getAllContact`;
  public static readonly GetContactByIDUrl = `${UrlContant.baseUrl}contact/getContactByID`;
  public static readonly DeleteContactByIDUrl = `${UrlContant.baseUrl}contact/deleteContactByID`;

  public static readonly CreateEventUrl = `${UrlContant.baseUrl}event/createEvent`;
  public static readonly EditEventUrl = `${UrlContant.baseUrl}event/editEvent`;
  public static readonly SearchEventUrl = `${UrlContant.baseUrl}event/getAllEvent`;
  public static readonly GetEventByIDUrl = `${UrlContant.baseUrl}event/getEventByID`;
  public static readonly DeleteEventByIDUrl = `${UrlContant.baseUrl}event/deleteEventByID`;
}
