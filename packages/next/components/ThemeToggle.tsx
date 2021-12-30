import { useTheme } from 'next-themes'
import { IconButton } from '@modulz/design-system'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <IconButton
      variant="ghost"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      css={{ '&:hover': { cursor: 'pointer' } }}
      aria-label="Toggle between the light and dark color themes"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
