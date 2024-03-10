/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

/**
 * Represents an entity without an identifier.
 *
 * @template T - The type of the entity
 *
 * This utility type `EntityWithoutId<T>` is used to create a Type or Interface that omits the 'id' property from a given Type T.
 * It's particularly useful when you want to work with entity instances without considering their primary key (which is assumed to be 'id' in this case).
 *
 * Please note, if the primary key in your entities changes from 'id' to something else, you will need to update this utility type
 * accordingly to reflect the new primary key. This update would be as simple as replacing 'id' in the `Omit<T, 'id'>;` with the new primary key.
 */
export type EntityWithoutId<T> = Omit<T, 'id'>;
