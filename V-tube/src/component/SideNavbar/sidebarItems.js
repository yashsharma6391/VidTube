// components/Sidebar/sidebarItems.js
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HistoryIcon from '@mui/icons-material/History';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';

export const topMenu = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/shorts', icon: VideocamIcon, label: 'Shorts' },
  { to: '/subscriptions', icon: SubscriptionsIcon, label: 'Subscription' },
];

export const youMenu = [
  { icon: ArrowRightIcon, label: 'You' },
  { to: '/channel', icon: RecentActorsIcon, label: 'Your Channel' },
  { to: '/history', icon: HistoryIcon, label: 'History' },
  { to: '/playlists', icon: PlaylistAddIcon, label: 'Playlists' },
  { to: '/your-videos', icon: SmartDisplayIcon, label: 'Your videos' },
  { to: '/watch-later', icon: WatchLaterIcon, label: 'Watch Later' },
  { to: '/liked', icon: ThumbUpOffAltIcon, label: 'Liked videos' },
  { to: '/clips', icon: ContentCutIcon, label: 'Your clips' },
];

export const subscriptions = [
  {
    to: '/channel/marvel',
    icon: 'https://e7.pngegg.com/pngimages/419/220/png-clipart-logo-marvel-comics-marvel-entertainment-marvel-studios-others-comics-avengers.png',
    label: 'Marvel',
    isImage: true,
  },
];
