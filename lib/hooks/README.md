# Authentication Hooks Documentation

## Overview
This directory contains custom hooks for authentication using Tanstack Query and NextAuth.

## Available Hooks

### `useCurrentUser()`
Fetches the current authenticated user from the backend using Tanstack Query.

**Returns:**
```typescript
{
  data: { user: User } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}
```

**Example:**
```typescript
import { useCurrentUser } from "@/lib/hooks/useAuth";

function ProfileComponent() {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user</div>;

  return <div>Welcome, {data?.user.name}!</div>;
}
```

### `useLogout()`
Handles user logout with backend API call and session cleanup.

**Returns:**
```typescript
{
  mutate: () => void;
  mutateAsync: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
```

**Example:**
```typescript
import { useLogout } from "@/lib/hooks/useAuth";

function LogoutButton() {
  const { mutate: logout, isLoading } = useLogout();

  return (
    <button onClick={() => logout()} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
```

### `useUser()`
Combines session and query data to provide user information.

**Returns:**
```typescript
{
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
```

**Example:**
```typescript
import { useUser } from "@/lib/hooks/useAuth";

function UserProfile() {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

## User Type

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  provider: string | null;
  provider_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}
```

## API Endpoints

- **Get Current User:** `GET /api/v1/auth/me` (requires authentication)
- **Logout:** `POST /api/v1/auth/logout` (requires authentication)

## Notes

- All hooks require the app to be wrapped with `SessionProvider` and `QueryProvider`
- Authentication token is automatically included in requests via `getAuthHeaders()`
- User data is cached for 5 minutes to reduce API calls
- Logout automatically clears all cached data and redirects to signin page
