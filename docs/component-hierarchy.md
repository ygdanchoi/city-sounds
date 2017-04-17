## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**HomeContainer**
 - Home
 - ExploreList
  - ExploreListItem
  - SoundPlayer

**UserContainer**
 - NavBar
 - User
  - CollectionList
   - CollectionListItem
 - UserSidebar

**CollectionContainer**
 - NavBar
 - Collection
  - CollectionPlayer
  - SoundList
   - SoundListItem

**SearchResultsContainer**
 - NavBar
 - SearchResultsList
  - SearchResultsListItem

**CollectionFormContainer**
 - NavBar
 - CollectionForm
  - SoundForm
   - SoundFormItem

## Routes

| Path                      | Component               |
|---------------------------|-------------------------|
| /sign-up                  | AuthFormContainer       |
| /log-in                   | AuthFormContainer       |
| /                         | HomeContainer           |
| /users/:userId            | UserContainer           |
| /sounds/:soundId          | SoundContainer          |
| /collection/:collectionId | CollectionContainer     |
| /search-results           | SearchResultsContainer  |
| /new-collection           | CollectionFormContainer |
| /edit-collection          | CollectionFormContainer |
