import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { brand } from '../data.js';

export function FacebookIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

export function getConfiguredSocialItems(social = brand.social) {
  const items = [];
  if (social?.facebook && social.facebook.startsWith('http')) {
    items.push({
      key: 'facebook',
      name: 'Facebook',
      handle: '@brandidentitytourntravel',
      url: social.facebook,
      label: 'Brand Identity Tour & Travel on Facebook',
      Icon: FacebookIcon,
    });
  }
  if (social?.instagram && social.instagram.startsWith('http')) {
    items.push({
      key: 'instagram',
      name: 'Instagram',
      handle: '@brandidentitytourntravel',
      url: social.instagram,
      label: 'Brand Identity Tour & Travel on Instagram',
      Icon: InstagramIcon,
    });
  }
  if (social?.youtube && social.youtube.startsWith('http')) {
    items.push({
      key: 'youtube',
      name: 'YouTube',
      handle: '@brandidentitytourntravel',
      url: social.youtube,
      label: 'Brand Identity Tour & Travel on YouTube',
      Icon: YoutubeIcon,
    });
  }
  return items;
}

export default function SocialLinks({
  variant = 'icons',
  size = 17,
  className = '',
}) {
  const items = getConfiguredSocialItems();
  if (items.length === 0) return null;

  if (variant === 'cards') {
    return (
      <div className={`social-profile-cards ${className}`.trim()} aria-label="Official social media profiles">
        {items.map(({ key, name, handle, url, label, Icon }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-profile-card social-platform-${key}`}
            aria-label={label}
          >
            <span className={`social-platform-badge social-badge-${key}`}>
              <Icon size={18} />
            </span>
            <div className="social-profile-text">
              <strong>{name}</strong>
              <small>{handle}</small>
            </div>
            <ArrowUpRight size={15} className="social-profile-arrow" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`social-links ${className}`.trim()} aria-label="Social media links">
      {items.map(({ key, url, label, Icon }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon-link social-platform-${key}`}
          aria-label={label}
          title={label}
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
