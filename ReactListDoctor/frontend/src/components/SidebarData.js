import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard-doctor',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Calendário',
    path: '#',
    icon: <FaIcons.FaCalendarAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Pacientes',
    path: '#',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav-text'
  },
  {
    title: 'Perfil',
    path: '#',
    icon: <FaIcons.FaUserMd />,
    cName: 'nav-text'
  },

]