import { expect, vi } from 'vitest'
import '@testing-library/jest-dom'

process.env.TMDB_API_KEY = 'test_api_key_12345'

global.fetch = vi.fn()