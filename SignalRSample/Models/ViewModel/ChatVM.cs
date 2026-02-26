namespace SignalRSample.Models.ViewModel
{
    public class ChatVM
    {
        public ChatVM()
        {
            Rooms = new List<ChatRoom>();
        }

        public int MaxRoolAllowed { get; set; }
        public IList<ChatRoom> Rooms { get; set; }
        public string? UserId { get; set; }
        public bool AllowAdRoom => Rooms == null || Rooms.Count < MaxRoolAllowed;
    }
}
