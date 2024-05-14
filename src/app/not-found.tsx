import { ErrorAction } from '@/shared/components/error-action';
import { NotFoundButton } from '@/shared/components/not-found-button';

const IMAGE_SOURCE = '/not-found.png';
const HEADING_TEXT = 'Nothing Here';
const MESSAGE_TEXT = 'Content appears to be lost in the digital void';

const imageProps = {
  src: IMAGE_SOURCE,
  width: 627,
  height: 445.5,
};

const textContent = {
  heading: HEADING_TEXT,
  message: MESSAGE_TEXT,
};

const classNames = {
  image: '-mb-8',
};

const NotFound = () => (
  // TODO: Adjust left-padding after nav implementation
  <div className="flex min-h-screen w-full items-center justify-center">
    <ErrorAction
      isTransparent
      textContent={textContent}
      imageProps={imageProps}
      classNames={classNames}
      action={<NotFoundButton />}
    />
  </div>
);

export default NotFound;
