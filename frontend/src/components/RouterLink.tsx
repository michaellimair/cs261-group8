import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';
import { FC } from 'react';

/** Custom Link component which combines the `Link` component
 * from Chakra UI and the `Link` component from `react-router-dom`. */
const RouterLink: FC<LinkProps & ReactRouterLinkProps> = (props) => (
  <Link as={ReactRouterLink} {...props} />
);

export default RouterLink;
